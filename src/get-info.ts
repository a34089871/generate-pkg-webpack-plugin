import { execSync } from "child_process";
export type Commit = string | null

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

const execCMD = (command: string): Commit => {
  try {
    return execSync(command).toString().trim();
  } catch(e) {
    return null
  }
}
execCMD("git show -s --format=%H");

// git 最后一次提交的 Head
const commit: Commit = execCMD("git show -s --format=%H");

const commitUserName: Commit = execCMD("git show -s --format=%cn");

const commitUserMail: Commit = execCMD("git show -s --format=%ce");

const branch: Commit = execCMD("git show -s --format=%ce");

const commitDate = (): Commit => {
  const d: Commit = execCMD(`git show -s --format=%cd`);

  return d ? dateFormat(new Date(d)) : null;
};

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
  commitDate: commitDate(),
  branch
};

// export const buildInfo = {
  // buildUserName,
  // buildUserMail,
  // buildTime,
// };
