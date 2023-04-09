function a() {
  return "hello";
}
function b(cd) {
  return () => {
    console.log(1);
    let a = cd();
    return a;
  };
}
let c = b(a);
console.log(c);
