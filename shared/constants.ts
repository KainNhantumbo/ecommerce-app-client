import Package from "../package.json"

export const constants = {
  name: 'Ecommerce',
  author: Package.author,
  version: Package.version,
  license: Package.license,
  repository: Package.repository.url,
  keywords: Package.keywords.join(' '),
  url: Package.url,
  description: Package.description,
};
