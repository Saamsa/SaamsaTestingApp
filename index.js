document.addEventListener('DOMContentLoaded', () => {
  const getAllTopics = () => {
    fetch('https://demo.saamsa.io/getAllTopics')
      .then((res) => res.json())
      .then((topics) => {
        // console.log(topics);
        topics.forEach((topic) => {
          // console.log(topic)
          const option1 = document.createElement('option');
          option1.setAttribute('value', topic);
          option1.innerText = topic;

          document.querySelector('#allTopicsCreated').appendChild(option1);

          const option2 = document.createElement('option');
          option2.setAttribute('value', topic);
          option2.innerText = topic;
          document.querySelector('#allTopicsWritten').appendChild(option2);
        });
      });
  };
  getAllTopics();
  document.querySelector('#createTopic').addEventListener('click', () => {
    const topic = document.querySelector('#topic').value;
    const numPartitions = document.querySelector('#numPartitions').value;
    document.querySelector('#topic').value = null;
    document.querySelector('#numPartitions').value = null;
    fetch(
      `https://demo.saamsa.io/createTopic?topic=${topic}&numPartitions=${numPartitions}`,
      {
        method: 'POST',
      }
    ).then(() => {
      window.location.reload();
    });
  });

  document.querySelector('#writeTopic').addEventListener('click', () => {
    const selected = document.querySelector('#allTopicsCreated').value;
    fetch(`https://demo.saamsa.io/writeTopic?topic=${selected}`);
  });

  document.querySelector('#readTopic').addEventListener('click', () => {
    const selected = document.querySelector('#allTopicsWritten').value;
    fetch(`https://demo.saamsa.io/readTopic?topic=${selected}`);
  });
});
