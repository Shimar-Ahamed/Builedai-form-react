import React, { useState } from 'react';
import './MainForm.css'; // CSS for styling

const MainForm = () => {
  const [activeSection, setActiveSection] = useState('sidebar');
  const [title, setTitle] = useState('Welcome to the form!');
  const [description, setDescription] = useState('This is the description.');
  const [addText, setAddText] = useState('');
  const [image, setImage] = useState(null);
  const [placement, setPlacement] = useState('left');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([]); // State for added fields

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    setActiveSection('sidebar');
  };

  const handleDiscard = () => {
    setActiveSection('sidebar');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addField = (fieldType) => {
    const newField = { type: fieldType, title: '', description: '' };
    setFields([...fields, newField]);
    toggleModal();
  };

  const editField = (index) => {
    setActiveSection(`edit-field-${index}`);
  };

  const renderFieldEditor = (index) => {
    const field = fields[index];
    return (
      <div className="form-group">
        <div className="editor-header">
          <h3>Edit {field.type} Field</h3>
          <button className="close-btn" onClick={() => setActiveSection('sidebar')}>X</button>
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={field.title}
            onChange={(e) => {
              const updatedFields = [...fields];
              updatedFields[index].title = e.target.value;
              setFields(updatedFields);
            }}
            placeholder="Enter title here"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={field.description}
            onChange={(e) => {
              const updatedFields = [...fields];
              updatedFields[index].description = e.target.value;
              setFields(updatedFields);
            }}
            placeholder="Enter description here"
          />
        </div>
        <div className="form-actions">
          <button className="save-btn" onClick={() => setActiveSection('sidebar')}>Save</button>
          <button className="discard-btn" onClick={() => setActiveSection('sidebar')}>Discard</button>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        {activeSection === 'sidebar' ? (
          <>
            <div className="sidebar-header">
              <h2>Sidebar</h2>
              <button className="close-btn" onClick={() => setActiveSection('sidebar')}>X</button>
            </div>

            <div className="sidebar-menu">
              <ul>
                <li>Content</li>
                <li>Design</li>
                <li>Share</li>
                <li>Replies</li>
              </ul>
            </div>

            <div className="steps">
              <h3>Steps</h3>
              <p>The steps users will take to complete the form</p>

              <div className="steps-menu">
                <ul>
                  <li onClick={() => setActiveSection('edit-welcome')}>Welcome Screen</li>
                  {fields.map((field, index) => (
                    <li key={index} onClick={() => editField(index)}>{field.type} Field</li>
                  ))}
                </ul>
              </div>

              <button className="add-field" onClick={toggleModal}>+ Add Field</button>
              <hr />
              <div className="steps-menu">
                <ul>
                  <li>End Screen</li>
                </ul>
              </div>
            </div>

            <div className="actions">
              <button className="save-btn">Save & Publish</button>
              <button className="delete-btn">Delete</button>
            </div>
          </>
        ) : activeSection.startsWith('edit-field-') ? (
          renderFieldEditor(parseInt(activeSection.split('-')[2], 10))
        ) : (
          <>
            <button className="close-btn" onClick={() => setActiveSection('sidebar')}>X</button>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title here"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description here"
              />
            </div>

            <div className="form-group">
              <label>Add Text:</label>
              <input
                type="text"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                placeholder="Enter text here"
              />
            </div>
            <div className="form-group">
              <label>Upload Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Preview" />
                  <button onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Placement:</label>
              <div className="placement-buttons">
                <button
                  className={placement === 'left' ? 'active' : ''}
                  onClick={() => setPlacement('left')}
                >
                  Left Side Text, Right Side Photo
                </button>
                <button
                  className={placement === 'right' ? 'active' : ''}
                  onClick={() => setPlacement('right')}
                >
                  Right Side Photo, Left Side Text
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="discard-btn" onClick={handleDiscard}>Discard</button>
            </div>
          </>
        )}
      </div>

      <div className="layout">
        {activeSection.startsWith('edit-field-') ? (
          // Blank layout for additional fields
          <div className="blank-layout">
            <h3>{fields[parseInt(activeSection.split('-')[2], 10)].title}</h3>
            <p>{fields[parseInt(activeSection.split('-')[2], 10)].description}</p>
          </div>
        ) : placement === 'left' ? (
          <>
            <div className="text-section">
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{addText}</p>
              {/* Do not display added fields here */}
            </div>
            <div className="image-section">
              {image && <img src={image} alt="Uploaded" />}
            </div>
          </>
        ) : (
          <>
            <div className="image-section">
              {image && <img src={image} alt="Uploaded" />}
            </div>
            <div className="text-section">
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{addText}</p>
              {/* Do not display added fields here */}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>X</button>
            <h3>Add field</h3>
            <div className="field-options">
              <div className="field-option" onClick={() => addField('Email')}>Email</div>
              <div className="field-option" onClick={() => addField('Short Text')}>Short Text</div>
              <div className="field-option" onClick={() => addField('Multiple Choice')}>Multiple Choice</div>
              <div className="field-option">Dropdown</div>
              <div className="field-option">Phone Number</div>
              <div className="field-option">Section</div>
              <div className="field-option">Contact Information</div>
              <div className="field-option">Legal</div>
              <div className="field-option">Country</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainForm;
