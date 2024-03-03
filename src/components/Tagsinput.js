import { useState } from "react"

function TagsInput({ setAppTags }){
    const [tags, setTags] = useState([])

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        const newTags = [...tags, value];
        setTags(newTags);
        setAppTags(newTags); // Update tags in the App component
        e.target.value = '';
    }

    function removeTag(index){
        const newTags = tags.filter((el, i) => i !== index);
        setTags(newTags);
        setAppTags(newTags); // Update tags in the App component
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag,index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            <div className="input-wrapper"> {/* New wrapper for the input */}
                <input onKeyDown={handleKeyDown} className="tags-input" placeholder="Add a tag" />
            </div>
        </div>
    )
}

export default TagsInput