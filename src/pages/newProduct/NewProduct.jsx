import "./newProduct.css";
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { createProduct } from "../../redux/apiCalls";
import { useDispatch } from 'react-redux';

export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({})
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    /**
     * DOCS https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0
     */
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          const newProduct = {...inputs, img:downloadURL, categories:cat}
          createProduct(dispatch, newProduct)
        });
      }
    );
  }

  return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input name="price" type="number" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea name="desc" rows="5" onChange={handleChange}></textarea>
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input type="text" onChange={handleCat}/>
          </div>
          {/* <div className="addProductItem">
            <label>Size</label>
            <select name="size" id="active">
              <option value="S">S</option>
            </select>
          </div> */}
    
          <div className="addProductItem">
            <label>In Stock</label>
            <select name="inStock" id="active" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        </form>
      </div>
  );
}
