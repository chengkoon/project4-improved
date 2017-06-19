import axios from 'axios'

// function upload (formData) {
//   return axios.post(process.env.CLOUDINARY_URL, formData, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
//   .then(res => res.data)
//   .catch((err) => {
//     console.log('error is...', err)
//   })
//     // get data
//     // .then(x => x.data)
//     // // add url field
//     // .then(x => x.map(img => Object.assign({},
//     //   img, { url: `${BASE_URL}/images/${img.id}` })))
// }

function upload (fileName) {
  return axios.post('http://localhost:3000/newImage', { fileName: fileName })
  .then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

export { upload }
