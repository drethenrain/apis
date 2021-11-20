const { default: got } = require('got');

module.exports = class Github {
  #endpoint = 'https://api.github.com';
  #request = path =>
    got(`${this.#endpoint}${path}`)
      .then(res => JSON.parse(res.body))
      .catch(console.log);

  getUser(user) {
    return this.#request(`/users/${user}`);
  }

  getUserRepos(user) {
    return this.#request(`/users/${user}/repos`);
  }

  getUserFollowers(user) {
    return this.#request(`/users/${user}/followers`);
  }

  getUserOrgs(user) {
    return this.#request(`/users/${user}/orgs`);
  }

  getOrg(org) {
    return this.#request(`/orgs/${org}`);
  }

  getOrgMembers(org) {
    return this.#request(`/orgs/${org}/members`);
  }

  getOrgRepos(org) {
    return this.#request(`/orgs/${org}/repos`);
  }

  getOrgTeams(org) {
    return this.#request(`/orgs/${org}/teams`);
  }

  getRepo(owner, name) {
    return this.#request(`/repos/${owner}/${name}`);
  }
};
