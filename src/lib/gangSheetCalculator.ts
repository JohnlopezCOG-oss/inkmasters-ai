import { ROLL_WIDTH_INCHES, GANG_SHEET_LENGTHS } from "./systemPrompt";

// ── Types ──────────────────────────────────────────────────────────

export interface DesignInput {
  width: number;
  height: number;
  quantity: number;
  allowRotation?: boolean;
}

export interface SheetRecommendation {
  recommendedSize: string;
  recommendedLength: number;
  estimatedRequiredLength: number;
  fullnessRatio: number;
  nextSizeUp: string | null;
  nextSizeUpLength: number | null;
  notes: string[];
}

export interface CalculatorError {
  error: string;
  notes: string[];
}

export type CalculatorResult = SheetRecommendation | CalculatorError;

// ── Constants ──────────────────────────────────────────────────────

const PACKING_EFFICIENCY = 0.85;
const TIGHT_FIT_THRESHOLD = 0.90;
const MAX_SHEET_LENGTH = GANG_SHEET_LENGTHS[GANG_SHEET_LENGTHS.length - 1];

// ── Helpers ────────────────────────────────────────────────────────

function formatSize(length: number): string {
  return `${ROLL_WIDTH_INCHES}" × ${length}"`;
}

/** True if the design fits within the roll width at the given orientation. */
function fitsWidth(w: number, h: number): boolean {
  return w <= ROLL_WIDTH_INCHES && h <= ROLL_WIDTH_INCHES;
}

function findNextAvailableLength(requiredLength: number): number | null {
  for (const len of GANG_SHEET_LENGTHS) {
    if (len >= requiredLength) return len;
  }
  return null;
}

// ── Core calculator ────────────────────────────────────────────────

export function isCalculatorError(
  result: CalculatorResult
): result is CalculatorError {
  return "error" in result;
}

/**
 * Given one or more identical designs, calculate which gang sheet
 * size fits them best.
 *
 * Rules:
 *  1. Each design must fit within the 22" roll width.
 *  2. If rotation is allowed, the orientation that uses the roll
 *     width most efficiently is chosen automatically.
 *  3. Total area is divided by packing efficiency (default 85%)
 *     to account for spacing / irregular arrangement.
 *  4. The result is rounded up to the next available sheet length.
 *  5. If fullness > 90 %, the next size up is flagged as safer.
 *  6. If the required length exceeds 240", a multi-sheet split
 *     is recommended.
 */
export function calculateGangSheet(input: DesignInput): CalculatorResult {
  const { width, height, quantity, allowRotation = false } = input;
  const notes: string[] = [];

  // ── Validate dimensions ──────────────────────────────────────
  if (width <= 0 || height <= 0 || quantity <= 0) {
    return {
      error: "Width, height, and quantity must all be greater than zero.",
      notes: [],
    };
  }

  // ── Check if design fits the roll width ──────────────────────
  let effectiveW = width;
  let effectiveH = height;
  const normalFits = width <= ROLL_WIDTH_INCHES;
  const rotatedFits = height <= ROLL_WIDTH_INCHES;

  if (!normalFits && allowRotation && rotatedFits) {
    effectiveW = height;
    effectiveH = width;
    notes.push(
      `Design rotated to ${effectiveW}" × ${effectiveH}" to fit the ${ROLL_WIDTH_INCHES}" roll width.`
    );
  } else if (!normalFits && !rotatedFits) {
    return {
      error: `Design is ${width}" × ${height}" — both dimensions exceed the ${ROLL_WIDTH_INCHES}" roll width. The design would need to be resized or split into panels to fit.`,
      notes: [
        "Consider breaking the design into smaller sections that each fit within 22\" wide.",
      ],
    };
  } else if (!normalFits && !allowRotation) {
    if (rotatedFits) {
      return {
        error: `Design is ${width}" wide, which exceeds the ${ROLL_WIDTH_INCHES}" roll. However, if rotated (${height}" × ${width}") it would fit. Would you like me to calculate with rotation?`,
        notes: [],
      };
    }
    return {
      error: `Design is ${width}" wide, which exceeds the ${ROLL_WIDTH_INCHES}" roll width. The design would need to be resized to fit.`,
      notes: [],
    };
  }

  // Prefer the orientation that wastes less roll width
  if (
    allowRotation &&
    fitsWidth(effectiveW, effectiveH) &&
    fitsWidth(effectiveH, effectiveW)
  ) {
    const wasteNormal = ROLL_WIDTH_INCHES - effectiveW;
    const wasteRotated = ROLL_WIDTH_INCHES - effectiveH;
    if (wasteRotated < wasteNormal) {
      const temp = effectiveW;
      effectiveW = effectiveH;
      effectiveH = temp;
      notes.push(
        `Design oriented to ${effectiveW}" × ${effectiveH}" for a tighter fit across the roll.`
      );
    }
  }

  // ── Calculate required sheet length ──────────────────────────
  const totalArea = effectiveW * effectiveH * quantity;
  const adjustedArea = totalArea / PACKING_EFFICIENCY;
  const requiredLength = adjustedArea / ROLL_WIDTH_INCHES;

  // ── Multi-sheet split ────────────────────────────────────────
  if (requiredLength > MAX_SHEET_LENGTH) {
    const sheetsNeeded = Math.ceil(requiredLength / MAX_SHEET_LENGTH);
    const perSheetQty = Math.ceil(quantity / sheetsNeeded);
    const perSheetResult = calculateGangSheet({
      width: effectiveW,
      height: effectiveH,
      quantity: perSheetQty,
      allowRotation: false, // already resolved
    });

    const splitNotes = [
      `Total required length is ~${Math.ceil(requiredLength)}" which exceeds the maximum ${MAX_SHEET_LENGTH}" sheet.`,
      `Recommend splitting across ${sheetsNeeded} gang sheets (~${perSheetQty} designs each).`,
    ];

    if (isCalculatorError(perSheetResult)) {
      return { error: perSheetResult.error, notes: splitNotes };
    }

    return {
      ...perSheetResult,
      notes: [...splitNotes, ...perSheetResult.notes],
    };
  }

  // ── Find best sheet length ───────────────────────────────────
  const recommendedLength = findNextAvailableLength(requiredLength);

  if (recommendedLength === null) {
    return {
      error: `Calculated length (~${Math.ceil(requiredLength)}") exceeds all available sizes.`,
      notes: [
        "Consider splitting the order across multiple gang sheets.",
      ],
    };
  }

  const fullnessRatio = requiredLength / recommendedLength;

  // Find the next size up
  const currentIdx = GANG_SHEET_LENGTHS.indexOf(
    recommendedLength as (typeof GANG_SHEET_LENGTHS)[number]
  );
  const nextLength =
    currentIdx < GANG_SHEET_LENGTHS.length - 1
      ? GANG_SHEET_LENGTHS[currentIdx + 1]
      : null;

  if (fullnessRatio > TIGHT_FIT_THRESHOLD && nextLength) {
    notes.push(
      `This is a tight fit (~${Math.round(fullnessRatio * 100)}% full). The next size up (${formatSize(nextLength)}) would give more breathing room.`
    );
  }

  return {
    recommendedSize: formatSize(recommendedLength),
    recommendedLength,
    estimatedRequiredLength: Math.round(requiredLength * 100) / 100,
    fullnessRatio: Math.round(fullnessRatio * 100) / 100,
    nextSizeUp: nextLength ? formatSize(nextLength) : null,
    nextSizeUpLength: nextLength,
    notes,
  };
}
