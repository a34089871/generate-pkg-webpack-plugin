import child_process from "child_process";

const dateFormat = (d: Date = new Date()) => {
  if (d) {
    var times =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
      ":" +
      (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
      ":" +
      (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
    return times;
  } else {
    return "";
  }
};

// git 最后一次提交的 Head
const commit: string = child_process
  .execSync("git show -s --format=%H")
  .toString()
  .trim();

const commitUserName: string = child_process
  .execSync("git show -s --format=%cn")
  .toString()
  .trim();

const commitUserMail: string = child_process
  .execSync("git show -s --format=%ce")
  .toString()
  .trim();

// const branch: string = child_process
//   .execSync("git symbolic-ref --short HEAD")
//   .toString()
//   .trim();

const commitDate: string = dateFormat(
  new Date(child_process.execSync(`git show -s --format=%cd`).toString())
);

// const buildUserName: string = child_process
//   .execSync("git config user.name")
//   .toString()
//   .trim();
// const buildUserMail: string = child_process
//   .execSync("git config user.email")
//   .toString()
//   .trim();

export const buildTime: string = dateFormat();

export const commitInfo = {
  commit,
  commitUserName,
  commitUserMail,
  commitDate
  // branch
};

// export const buildInfo = {
  // buildUserName,
  // buildUserMail,
  // buildTime,
// };
