import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const attribute = [
  {
    "trait_type": "Genre",
    "value": ""
  },
  {
    "trait_type": "Head",
    "value": ""
  },
  {
    "trait_type": "Face",
    "value": ""
  },
  {
    "trait_type": "Skin",
    "value": ""
  },
  {
    "trait_type": "Queen",
    "value": ""
  },
  {
    "trait_type": "Symbolism",
    "value": ""
  }
]

function App() {
  
  const [filename, setFilename] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [attributes, setAttributes] = useState(attribute);

  const updateAttributes = (index, value) => {
    const _attrs = [ ...attributes ];
    _attrs[index].value = value;
    setAttributes(_attrs);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const metadata = {
      name,
      description,
      image,
      attributes
    };

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(metadata)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = filename + ".json";

    link.click();
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='input-box'>
        <div class="mb-3">
          <label class="form-label">File name</label>
          <input type="text" class="form-control" value={filename} onChange={(e) => setFilename(e.target.value)} required/>
        </div>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required/>
        </div>
        <div class="mb-3">
          <label class="form-label">Image</label>
          <input type="text" class="form-control" value={image} onChange={(e) => setImage(e.target.value)} required/>
        </div>
        <div className='row'>
          {
            attributes.map((item, idx) => (
              <div className='col-12 col-md-6' key={idx}>
                <div class="mb-3">
                  <label class="form-label">{item.trait_type}</label>
                  <input type="text" class="form-control" value={item.value} onChange={(e) => updateAttributes(idx, e.target.value)} required/>
                </div>
              </div>
            ))
          }
          <div className='col-12 col-md-6 d-flex align-items-center'>
            <button type='submit' className='btn btn-success w-100 mt-3'>Generate</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
