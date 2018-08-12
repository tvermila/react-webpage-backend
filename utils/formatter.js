exports.formatter = (data) => {
  let formattedArray = []
  data.rows.forEach(el => {
    formattedArray.push({
      id: el.doc._id,
      title: el.doc.title,
      otsikko: el.doc.otsikko || null,
      description: el.doc.description,
      kuvaus: el.doc.kuvaus || null
    })
  })
  return formattedArray
}