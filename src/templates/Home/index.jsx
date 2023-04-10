import { Component } from 'react';

//CSS
import './styles.css';

//Imports
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 30,
      searchValue: ''
  };

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse,photosResponse]);
    
    const postsJson = await posts.json();
    const photosJson = await photos.json();
    
    const postsAndPhotos = postsJson.map((post, index) => {
      return {...post, cover : photosJson[index].url}
    });
    
    const {page, postsPerPage} = this.state;

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos 
    });

  }

  loadMorePosts = () => {
    const {page, postsPerPage, allPosts, posts} = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage});
  }

  //Carrega assim que os componentes forem montados na tela
  async componentDidMount(){
    await this.loadPosts();
  }

  // handlePClick = () => { 
  //   const {counter} = this.state;
  //   this.setState({counter: counter + 1});
  //   console.log('Counter: '+counter);
  // }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render() {
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ? 
    posts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts;
    
    return (
      <section className="container">
        
        <h1>My Personal Posts</h1>
        
        <div class="search-container">
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        <br /><br />

        <Posts posts={filteredPosts}/>
        
        <div className="button-container">
          {/* {!searchValue && (
            <Button 
              disabled={noMorePosts} 
              onClick={this.loadMorePosts} 
              text="Load more posts"
            />  
          )}           */}

          {!searchValue ? 
          (
            <Button 
              disabled={noMorePosts} 
              onClick={this.loadMorePosts} 
              text="Load more posts"
            />  
          )
        : <h2>Not found...</h2>}

        </div>
      </section>
    );
  }
}

export default Home;