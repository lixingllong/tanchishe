function year(a) {
  if ((a % 4 == 0 && a % 100 != 0) || a % 400 == 0) {
    console.log(a + '为闰年');
  } else {
    console.log(a + '不是闰年');
  }
}
console.log(year(2003));
