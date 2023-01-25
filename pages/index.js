import Head from "next/head";
import { useState } from "react";
import classnames from "classnames";
import Words from "@/components/words";
import Loading from "@/components/loading";

export default function Home() {
  const [letters, setLetters] = useState("");
  const [laoding, setLaoding] = useState(false);
  const [words, setWords] = useState([]);
  const [alert, setAlert] = useState(false);
  const handleChange = (event) => {
    setLetters(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      get_words();
    }
  };

  const get_words = async () => {
    setLaoding(true);
    if (letters.length > 2) {
      var response = await fetch("/api/words?letters=" + letters);
      var result = await response.json();
      if (result.data.length > 1) await setWords(result.data);
      else {
        handle_alert("Lütfen farklı harfler giriniz!", "danger");
      }
    } else {
      handle_alert("Lütfen 2'den fazla harf giriniz!", "danger");
    }

    setLaoding(false);
  };

  const handle_alert = (message, type) => {
    if (alert !== false) clearTimeout(timeout);
    setAlert({
      msg: message,
      type: type,
    });

    var timeout = setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  return (
    <>
      <Head>
        <title>Harflerden Kelime Türetme</title>
        <meta name="description" content="Karışık harflerden kelime türetme" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {alert && (
        <div
          className={classnames({
            "absolute right-5 top-5 w-60 z-50 p-2 rounded-lg": true,
            "bg-green-600 text-white": alert.type === "success",
            "bg-red-600 text-white": alert.type !== "success",
          })}
        >
          <div>
            <label>{alert.type === "success" ? "Başarılı" : "Başarısız"}</label>
          </div>
          <div>
            <p className="text-sm">{alert.msg}</p>
          </div>
        </div>
      )}

      <main className="p-2">
        <div className="flex items-center justify-center my-10 flex-col ">
          <label className="text-xl">HARFLER</label>
          <input
            name="letters"
            className="border-gray-100 border w-2/4 h-8 focus:outline-none px-3 text-center text-gray-500 mt-4"
            onChange={handleChange}
            value={letters}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-3 py-1 bg-blue-600 rounded-md text-white font-semibold mt-3"
            onClick={get_words}
          >
            Oluştur
          </button>
        </div>
        {laoding === true ? (
          <Loading />
        ) : (
          words.length > 0 && <Words words={words} alert={handle_alert} />
        )}
      </main>
    </>
  );
}
