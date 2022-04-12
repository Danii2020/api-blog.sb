import bcrypt from 'bcrypt';

async function verufyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$P0tDf7plX4mbs/elXIL5zuMH1Zrv3pM7NEk77qwGR.u7Z/yOGutPS';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verufyPassword();
