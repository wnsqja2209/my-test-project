import buttonTest from "./button-test.json";
import bloodTypeTest from "./blood-type-test.json";
import mbtiSimpleTest from "./mbti-simple-test.json";
import empathyTest from "./empathy-test.json";
import ghibliCharacterTest from "./ghibli-character-test.json";
import fantasyJobTest from "./fantasy-job-test.json";
import blackWhiteTest from "./black-white-test.json";
import type { Test } from "@/types/test";

const tests: Test[] = [
  buttonTest as Test,
  bloodTypeTest as Test,
  mbtiSimpleTest as Test,
  empathyTest as Test,
  ghibliCharacterTest as Test,
  fantasyJobTest as Test,
  blackWhiteTest as Test,
];

// 명시적으로 배열을 export (배열 복사본 반환)
export default [...tests];
export { tests };
