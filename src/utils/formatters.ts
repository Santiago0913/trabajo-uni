export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculatePaintNeed(
  areaM2: number,
  coats: number = 2,
  coveragePerGallonM2: number = 35
) {
  const totalM2ToPaint = areaM2 * coats;
  const gallonsNeeded = Math.ceil((totalM2ToPaint / coveragePerGallonM2) * 10) / 10;
  
  // Calculate optimal combination of buckets (Cuñete 5 Gal, 1 Gal, 1/4 Gal)
  const cuñetes = Math.floor(gallonsNeeded / 5);
  const remainingAfterCuñetes = gallonsNeeded - (cuñetes * 5);
  const galones = Math.floor(remainingAfterCuñetes);
  const remainingFraction = remainingAfterCuñetes - galones;
  const cuartos = remainingFraction > 0.5 ? 2 : (remainingFraction > 0.05 ? 1 : 0);

  return {
    totalM2ToPaint,
    gallonsNeeded: Math.max(0.25, gallonsNeeded),
    recommendedPacks: {
      cuñetes,
      galones,
      cuartos
    }
  };
}
