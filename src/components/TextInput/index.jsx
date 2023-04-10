import './styles.css'

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input 
          type="search" 
          className="text-input" 
          placeholder="Search..." 
          onChange={handleChange}
          value={searchValue}
        />
    );
}