
const KEY_API = '7d10866b5e2f42557b3f5c3e370b8e84'
const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDEwODY2YjVlMmY0MjU1N2IzZjVjM2UzNzBiOGU4NCIsInN1YiI6IjY1NTkzYzg1MjI5MzFhMDBlMjY3MGQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nmHgfkJawFxkrcuhoMsGCaBKc0f3M7yisxPodZiv9M4'
const base_url = 'https://api.themoviedb.org/3'
const base_image = 'https://image.tmdb.org/t/p/w500'
const get_movie = 'discover/movie'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN_API}`
    }
};
// const fetch = require('node-fetch');
let seacrhForm = document.getElementById('seacrhForm');
seacrhForm.addEventListener('submit',function(e){
    e.preventDefault()
    console.log(this.search.value)
    const url = `${base_url}/search/movie?query=${this.search.value}`;
    const search_results= document.querySelector('.search-results')
    const search_results_section = document.querySelector('.search-results-section')
    search_results_section.style.display='none'
    
fetch(url, options)
.then(res => res.json())
.then(json => {
    search_results.innerHTML=''
    search_results_section.style.display='block'
    json.results.map(res=>{
        search_results.innerHTML+= `
        
        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
        <div class="custom-block custom-block-overlay">
            <a href="detail-page.html" class="custom-block-image-wrap">
                <img src=${base_image}${res.poster_path} class="custom-block-image img-fluid" alt="">
            </a>
    
            <div class="custom-block-info custom-block-overlay-info">
                <h5 class="mb-1">
                    <a href="listing-page.html">
                        ${res.original_title}
                    </a>
                </h5>
    
                <p class="badge mb-0">50 Episodes</p>
            </div>
        </div>
    </div>
        `
    })
 
})

})






async function fetch_movies(api) {
    const response = await fetch(api);
    const data = await response.json();
    SetCarousel(data.results)
    getDetails(data.results)
}
function getDetails(movies) {

    const lastest_episodes = document.querySelector('.lastest-episodes')
    let url_movies = []
    movies.map(movie => {

        const url = `${base_url}/movie/${movie.id}`;
        url_movies.push(url)
    })
        const fetch_to_url = url_movies.slice(0,2)
        console.log(fetch_to_url)
        fetch_to_url.forEach(url=>{
            fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                lastest_episodes.innerHTML += ` <div class="col-lg-6 col-12 mb-4 mb-lg-0 mt-3">
                <div class="custom-block d-flex">
                    <div class="">
                        <div class="custom-block-icon-wrap">
                            <div class="section-overlay"></div>
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src=${base_image}${json.poster_path} class="custom-block-image img-fluid" alt="">
                
                                <a href="#" class="custom-block-icon">
                                    <i class="bi-play-fill"></i>
                                </a>
                            </a>
                        </div>
                
                        <div class="mt-2">
                            <a href="#" class="btn custom-btn">
                                Subscribe
                            </a>
                        </div>
                    </div>
                
                    <div class="custom-block-info">
                        <div class="custom-block-top d-flex mb-1">
                            <small class="me-4">
                                <i class="bi-clock-fill custom-icon"></i>
                                50 Minutes
                            </small>
                
                            <small>Episode <span class="badge">15</span></small>
                        </div>
                
                        <h5 class="mb-2">
                            <a href="detail-page.html">
                                ${json.original_title}
                            </a>
                        </h5>
                
                        <div class="profile-block d-flex">
                            <img src=${base_image}${json.production_companies[0].logo_path} class="profile-block-image img-fluid" alt="">
                
                            <p>
                            ${json.production_companies[0].name}
                                <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                <strong>${json.production_companies[0].origin_country}</strong></p>
                        </div>
                
                        <p class="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                
                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                            <a href="#" class="bi-headphones me-1">
                                <span>120k</span>
                            </a>
                
                            <a href="#" class="bi-heart me-1">
                                <span>42.5k</span>
                            </a>
                
                            <a href="#" class="bi-chat me-1">
                                <span>11k</span>
                            </a>
                
                            <a href="#" class="bi-download">
                                <span>50k</span>
                            </a>
                        </div>
                    </div>
                
                    <div class="d-flex flex-column ms-auto">
                        <a href="#" class="badge ms-auto">
                            <i class="bi-heart"></i>
                        </a>
                
                        <a href="#" class="badge ms-auto">
                            <i class="bi-bookmark"></i>
                        </a>
                    </div>
                </div>
                </div>`
            })
            .catch(err => console.error('error:' + err));
        })


      

   
 
}

async function SetCarousel(movies) {
    console.log(movies)
    const carusel = document.querySelector('.owl-carousel')
    await movies.map(movie =>
        // const title = (movie.original_title).split(' ').slice(0,3).jion(' ')
        carusel.innerHTML +=
        `   
        <div class="owl-carousel-info-wrap item">
        <img src=${base_image}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">
        <img src="images/verified.png" class="owl-carousel-verified-image img-fluid" alt="">
        
        <div class="owl-carousel-info">
            <h6 class="mb-2">
                ${movie.original_title}
               
            </h6>
        
            <span class="badge">${movie.original_language}</span>
        
            <span class="badge">${movie.release_date}</span>
        </div>
        </div> 
        `

    )
    await $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
            },
            767: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });
}
const api_url = `${base_url}/${get_movie}?api_key=${KEY_API}`
fetch_movies(api_url)
