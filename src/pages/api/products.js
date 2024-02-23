import { FULLDATA } from "./fakeData";

export default async function handler(req, res) {
  const idsList = JSON.parse(req.query.ids);
  if (!idsList || idsList === "[]") {
    res.status(500).json({ message: "No IDs" });
    return;
  }
  const ids = idsList.map((id) => id.toString());
  const productsWithId = FULLDATA.filter((product) => ids.includes(product.id));
  res.status(200).json({ data: productsWithId });
}
