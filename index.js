document.addEventListener('DOMContentLoaded', () => {
  const getAllTopics = () => {
    fetch('http://localhost:3000/getAllTopics')
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
      `http://localhost:3000/createTopic?topic=${topic}&numPartitions=${numPartitions}`,
      {
        method: 'POST',
      }
    );
  });

  document.querySelector('#writeTopic').addEventListener('click', () => {
    const selected = document.querySelector('#allTopicsCreated').value;
    fetch(`http://localhost:3000/writeTopic?topic=${selected}`);
  });

  document.querySelector('#readTopic').addEventListener('click', () => {
    const selected = document.querySelector('#allTopicsWritten').value;
    fetch(`http://localhost:3000/readTopic?topic=${selected}`);
  });
});
