import { readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  // * Get Words With Query letters
  var result = await get_words(req.query.letters);
  // * Words Sort small to large
  result = result.sort((a, b) => a.length - b.length);
  // * return List Array
  let list = [];
  // * Model for list
  let model = null;

  // * Group by letter length of the word
  result.forEach((e) => {
    /**
     * * Model is null => First word
     * * if group word length is different
     */
    if (model === null || model.length !== e.length) {
      if (model !== null) list.push(model);

      model = {
        length: e.length,
        values: [],
      };

      model.length = e.length;
    }
    model.values.push(e);
  });

  list.push(model);

  res.status(200).json({ data: list });
}

/**
 *
 * @param {letters} search letters
 * @returns
 */

async function get_words(kelime) {
  var result = [];

  const file = path.join(process.cwd(), "data", "kelimeler.json");
  const json = await readFileSync(file, "utf8");
  const list = JSON.parse(json);
  let harf_listesi = kelime.split("");
  var harfler = harf_listesi;

  list.forEach((line) => {
    // caz
    if (line.length > 2) {
      var letters = line.split("");
      var control = true;
      var kelime = line.toLowerCase();

      for (let i = 0; i < kelime.length; i++) {
        const element = kelime[i];
        // kar
        var char = harfler.includes(element);

        var regex = new RegExp(element, "gi");
        var filter = harfler.filter((x) => x === element);
        var match = kelime.match(regex).length;

        if (filter.length < match) {
          control = false;
          break;
        }

        if (char === false) {
          control = false;
          break;
        }
      }

      if (control === true) {
        result.push(kelime);
        // console.log(result);
      }
    }
  });
  return result;
}
