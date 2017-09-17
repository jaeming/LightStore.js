class Store {
  constructor(resources) {
    this.resourceNames = [];
    resources.map( (resource)=> {
      this[resource] = [];
      this.resourceNames.push(resource)
    })
  }

  list(resource) {
    return this[resource]
  }

  get(resource, obj) {
    this[resource].find( (item)=> {
      return item.rid === obj.rid
    })
  }

  add(resource, obj) {
    obj.rid = Math.random().toString(36).substr(2, 16);
    this[resource].push(obj)
    return obj
  }

  update(resource, obj) {
    this[resource].find( (item)=> {
      return item.rid === obj.rid
    })
    Object.keys(obj).map( (attribute)=> {
      item[attribute] = obj[attribute]
    })
    return item
  }

  remove(resource, obj) {
    let list = this[resource];
    let indexList = list.map( (item)=> {return item.rid});
    let index = indexList.indexOf(obj.rid);
    list.splice(index, 1)
  }

  resources() {
    this.resourceNames.map( (name)=> {
      resourceObj = {}
      resourceObj[name] = this[name]
      return resourceObj
    })
  }
}
