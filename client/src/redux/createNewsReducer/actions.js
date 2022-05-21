import axios from "axios"
import firebase, {storage} from '../../firebase/index';
import { CREATE_NEWS, GET_CATEGORIES, config } from '../constantes';


const conectionRelation = (newId, categoryList) => {
    categoryList.forEach(category => {
        axios.post(`http://localhost:3000/news/${newId}/category/${category}`, null)
        .then(res => res)
        .catch(err => console.log(err));
    });
};

const addImages = (images, formval) => {
    if (images || formval){
        console.log("Start image upload");
        const uploadTask = firebase.storage().ref().child(`/news/images/${formval.name}/${images[0].name}`).put(images[0]);
        uploadTask.on(
        
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref(`news/images/${formval.name}`)
              .child(images[0].name)
              .getDownloadURL()
              .then(url => {console.log("Download url: ",url ); sendImgUrl(url, formval) })
          }
        )
      }    
};

const addImages2 = (images, newName, id, form) => {
    const promises = images.map(image => {
        return new Promise((resolve, reject) => {
            const uploadImage = firebase.storage().ref().child(`/news/images/${newName}/${image.name}`).put(image);
            uploadImage.on (
                "state_changed",
                snapshot => {},
                error => {reject(error)},
                async () => {
                    await storage
                        .ref(`/news/images/${newName}/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            resolve(form.image.push(url));
                        });
                }
            );
       });
    });
    Promise.all(promises)
    .then(res => {
        axios.put(`http://localhost:3000/news/${id}`, { form })
        .then(res => {
            window.location.reload(false);
        })
        .catch(err => console.log(err));
    });
};

const sendImgUrl = (url, formval) => {
    const valuesToDb = {...formval};
    valuesToDb.image = url;
    console.log("Values to Db: ",valuesToDb);
      axios.put(`http://localhost:3000/news/${valuesToDb.id}`, {form:valuesToDb})
      .then((res) => {
        console.log("se subio la imagen exitosamente",res);
      })
      .catch(error => console.log("Error on request: ",error))
  }

export const addNew = (form, images, categoryList) => dispatch => {
     axios.post('http://localhost:3000/news/', { form })
            .then(res => {
                const { id } = res.data
                console.log("AQUI ESTOY : =>".images);
                conectionRelation(id, categoryList);
                addImages2(images, form.name, id, form);
                dispatch({
                    type: CREATE_NEWS,
                    newNew: res.data
                });
            })
            .catch(err => console.log(err));
};


export const getCategories = () => dispatch => {
    axios.get('http://localhost:3000/category/all')
    .then(res => {
        dispatch({
            type: GET_CATEGORIES,
            categories: res.data
        });
    })
    .catch(error => console.log(error));
};

//aqui estoy alistando, llamando y ejecuntando las funciones que tienen su respectivo API para consumir del servicio