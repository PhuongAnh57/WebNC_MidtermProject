import User from "./User";
import Guest from "./Guest";

export default function Header() {
  const user = JSON.parse(localStorage.getItem('isUser'));

  //User: đã đăng nhập
  //Guest: chưa đăng nhập

  return (
    (user === true) ? <User /> : <Guest />
  );
}
