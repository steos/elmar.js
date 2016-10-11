import React from 'react'

const Action = {
  RequestMore: model => [{...model, gifUrl: null, error: false}, [getRandomGif(model.topic)]],
  NewGif: url => model => [{
    topic: model.topic,
    gifUrl: url || model.gifUrl,
    error: !url
  }, []]
}

const getRandomGif = (topic) => () =>
  fetch(randomUrl(topic))
    .then(res => res.json())
    .then(json => json.data.image_url)
    .catch(err => null)
    .then(url => Action.NewGif(url))

const randomUrl = topic =>
  `//api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`

export const init = (topic) =>
  [ {topic, gifUrl: null, error: false}
  , [getRandomGif(topic)]
  ]

export const update = (action, model) => action(model)

const imgStyle = {
  maxHeight:'200px',
  maxWidth:'200px'
}

const imgDivStyle = {
  width:'200px',
  height:'200px',
  border:'2px solid #333',
  padding:'2px'
}

const viewImage = url =>
  url
    ? <img src={url} style={imgStyle} />
    : <p>Loading&hellip;</p>

export const view = (signal, model) => (
  <div>
    <h4>Topic: {model.topic}</h4>
    <div style={imgDivStyle}>
      {model.error ? <span>Error/Not Found</span> : viewImage(model.gifUrl)}
    </div>
    {!model.gifUrl && !model.error
      ? <span>Please Wait</span>
      : <button onClick={signal(Action.RequestMore)}>More</button>}
  </div>
)

export default {init, update, view}
