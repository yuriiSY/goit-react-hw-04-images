import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="button-label">🔎</span>
        </button>

        <input
          onChange={handleChange}
          value={state.search}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.setState({
//       search: '',
//     });
//   };

//   render() {
//     const { handleChange, handleSubmit } = this;
//     const { search } = this.state;
//     return (
//       <header className="Searchbar">
//         <form onSubmit={handleSubmit} className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <span className="button-label">🔎</span>
//           </button>

//           <input
//             onChange={handleChange}
//             value={search}
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="search"
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
