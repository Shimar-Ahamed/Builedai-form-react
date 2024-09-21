import React, { useState } from 'react';

const EditableField = ({ fieldType, onSave, onDiscard }) => {
  const [title, setTitle] = useState(`${fieldType} Title`);
  const [description, setDescription] = useState(`This is the ${fieldType.toLowerCase()} description.`);

  return (
    <div className="editable-field">
      <button className="close-btn" onClick={onDiscard}>X</button>
      <div className="form-group">
        <label>{fieldType} Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button className="save-btn" onClick={() => onSave({ title, description })}>Save</button>
        <button className="discard-btn" onClick={onDiscard}>Discard</button>
      </div>
    </div>
  );
};

export default EditableField;
