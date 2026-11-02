// Glavne fotografije članaka. kind: "mecara" (vlastite fotke) ili "stock" (s evidencijom licence).
// Članak bez unosa dobiva brendirani privremeni blok.
const mec = (f, w, h, hr, en) => ({ kind: "mecara", base: `/img/foto/${f}`, w, h, alt: { hr, en } });
export const BLOG_IMAGES = {
  M01: mec("KKP4582", 1600, 1064, "Mesar reže odrezak u Mecari", "Butcher cutting a steak at Mecara"),
  M02: mec("KKP4545", 1600, 1064, "Svježa junetina u vitrini Mecare", "Fresh beef in Mecara's display counter"),
  R01: mec("KKP4561", 1600, 1064, "Marinirano meso i proizvodi za roštilj u vitrini Mecare", "Marinated meat and BBQ products in Mecara's counter"),
  G01: mec("KKP4497", 1064, 1600, "Ulaz u mesnicu Mecara u centru DOC u Lapadu", "Entrance to Mecara butcher shop at DOC in Lapad"),
};
