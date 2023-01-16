import classnames from "classnames";

function Words({ words, alert }) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-0 md:gap-5">
      {words.map((k, index) => {
        return (
          <div
            key={k.length}
            className={classnames({
              "my-5 md:my-0 border-gray-200 border py-3 px-2 width-50": true,
              "bg-gray-50": index % 2 == 0,
            })}
          >
            <label>{k.length} harfli kelimeler.</label>

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
                        alert(`"${v}" panoya kaydedildi.`, "success");
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
  );
}

export default Words;
