import React,{useState} from 'react';
import {Carousel} from 'react-bootstrap';
function CarouselSlider() {

        const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
      <div className="carouselSlider">
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img style={{height:"70vh"}}
          className="d-block w-100"
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-6y2FcjNzqxw%2FT9XjV6VTI0I%2FAAAAAAAACd8%2FnbqAnV0MTOU%2Fw1200-h630-p-k-no-nu%2F1327224835_shopping%2B(1).jpg&f=1&nofb=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h2>Tired of shopping physically?</h2>
          <h4>Shopping Cavern provides everything a physical shop does right from your home.</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{height:"70vh"}}
          className="d-block w-100"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8h83w_iskLTNRSwuYhyK0gHaD3%26pid%3DApi&f=1"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{height:"70vh"}}
          className="d-block w-100"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.hoBS1TBXikv-7BbFuE61wAHaC_%26pid%3DApi&f=1"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    )
}

export default CarouselSlider
