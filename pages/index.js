import Head from "next/head";
import { useState } from "react";
import classnames from "classnames";

export default function Home() {
  const [letters, setLetters] = useState("");
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
    if (letters.length > 0) {
      var response = await fetch("/api/words?letters=" + letters);
      var result = await response.json();
      await setWords(result.data);
    }
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

        {words.length > 0 && (
          <div className="flex flex-col md:flex-row flex-wrap gap-0 md:gap-5">
            {words.map((k, index) => {
              return (
                <div
                  key={k.length}
                  className={classnames({
                    "my-5 md:my-10 border-gray-200 border py-3 px-2 width-50": true,
                    "bg-gray-50": index % 2 == 0,
                  })}
                >
                  <label>{k.length} harfli words</label>

                  <div className="flex gap-5 flex-wrap mt-3">
                    {k.values.length > 0 &&
                      k.values.map((v) => {
                        return (
                          <label
                            className={classnames({
                              "bg-white px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300":
                                index % 2 == 0,
                              "bg-gray-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300":
                                index % 2 == 1,
                            })}
                            key={v}
                            onClick={() => {
                              navigator.clipboard.writeText(v);
                              handle_alert(
                                `"${v}" panoya kaydedildi.`,
                                "success"
                              );
                            }}
                          >
                            {v}
                          </label>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
