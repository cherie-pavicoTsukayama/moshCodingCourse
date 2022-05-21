console.log('before');
getUser(1, (user) => {
  console.log('User: ', user);

  getRepositories(user.gitHubUsername, (repo)=> {
    console.log('Repo: ', repo);
  });
  }
);
console.log('After');

function getUser(id, callback){
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Reading repo...')
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000)
}
