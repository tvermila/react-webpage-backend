exports.formatter = (data) => {
  let formattedArray = []
  data.rows.forEach(el => {
    formattedArray.push({
      id: el.doc._id,
      title: el.doc.title,
      description: el.doc.description
    })
  })
  return formattedArray
}