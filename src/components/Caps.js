import React from 'react'

function Caps() {
  const [caps, setCaps] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/24y43o.jpg',
  })

  const [allCaps, setAllCaps] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllCaps(data.data.memes))
  }, [])

  function handleClick() {
    const randomNumber = Math.floor(Math.random() * allCaps.length)
    const url = allCaps[randomNumber].url
    setCaps((prevCaps) => {
      return {
        ...prevCaps,
        randomImage: url,
      }
    })
    //console.log(imgUrl)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setCaps((prevCaps) => {
      return {
        ...prevCaps,
        [name]: value,
      }
    })
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          name="topText"
          value={caps.topText}
          onChange={handleChange}
          placeholder="Top Text"
          className="form-input"
        />
        <input
          type="text"
          name="bottomText"
          value={caps.bottomText}
          onChange={handleChange}
          placeholder="Bottom Text"
          className="form-input"
        />
        <button className="form-btn" onClick={handleClick}>
          Get random new image
        </button>
      </div>
      <div className="caps">
        <img src={caps.randomImage} className="caps-image" />
        <h2 className="caps-text top">{caps.topText}</h2>
        <h2 className="caps-text bottom">{caps.bottomText}</h2>
      </div>
    </main>
  )
}

export default Caps
