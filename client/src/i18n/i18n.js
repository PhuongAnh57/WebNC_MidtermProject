import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "home": "Home",
      "calendar": "Calendar",
      "teaching": "Teaching",
      "enrolled": "Enrolled",
      "archived classes": "Archived classes",
      "settings": "Settings",
      "to do": "To do",
      "create class": "Create class",
      "stream": "Stream",
      "classwork": "Classwork",
      "people": "People",
      "upcoming": "Upcoming",
      "no work due soon": "No work due soon",
      "view all": "View all",
      "view your work": "View your work",
      "all topics": "All topics",
      "teachers": "Teachers",
      "students": "Students",
      "edit account": "Edit account",
      'log out': 'Log out',
    }
  },
  vi: {
    translation: {
      "home": "Màn hình chính",
      "calendar": "Lịch",
      "teaching": "Giảng dạy",
      "enrolled": "Đã đăng ký",
      "archived classes": "Lớp học đã lưu trữ",
      "settings": "Cài đặt",
      "to do": "Việc cần làm",
      "create class": "Tạo lớp học",
      "stream": "Bảng tin",
      "classwork": "Bài tập",
      "people": "Mọi người",
      "upcoming": "Sắp đến hạn",
      "no work due soon": "Không có bài tập nào sắp đến hạn",
      "view all": "Xem tất cả",
      "view your work": "Xem bài tập của bạn",
      "all topics": "Tất cả chủ đề",
      "teachers": "Giáo viên",
      "students": "Học sinh",
      "edit account": "Chỉnh sửa hồ sơ",
      'log out': 'Đăng xuất',
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "vi", // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;