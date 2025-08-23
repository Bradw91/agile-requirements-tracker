import React from "react";

const WorkItemEditPopUp: React.FC = () => {
  return (
    <div>
      <h2>Edit Work Item</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <textarea name="description" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WorkItemEditPopUp;
