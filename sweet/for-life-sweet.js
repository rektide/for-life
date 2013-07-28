
var Queue= function(){}
var forEach= Array.prototype.forEach;

/**
  Returns a Queue which exposes all elements for a Tag name
  @param tag a tag name to look for in the document
  @param predicate (optional) a filter for tagging
  @param document (optional) a document to begin looking through
  @returns a Queue of all elements for a given Tag, adorned with a addDocument function.
*/
module.exports= (function(){
	function Tag(tag,predicate,document){
		if(!(this instanceof Tag)){
			return new Tag(tag,predicate,document)
		}
		this.tag= tag
		if(typeof predicate !== "function"){
			document= predicate
		}else{
			this.predicate= predicate
		}
		this.queue= new Queue()
		this.queue.addDocument= this.addDocument.bind(this)
		if(document){
			this.addDocument(document)
		}
		return this.queue
	}
	return Tag
}())
/**
  Adds a new document to observation.

  Note that the Tag Queue has a bound copy of this function.
  @returns the original Queue object
*/
module.exports.prototype.addDocument= function(document){
	if(document){
		var mutationObserver= makeMutationObserver(this)
		mutationObserver.observe(document, {childList: true})
		var queue= this.queue.put.bind(this.queue)
		forEach.call(document.getElementsByTagName(tag),queue)
	}
	return this.queue
}
/**
  @params this a bound, individual mutations observer function
  @param mutations a Mutation Observation event
*/
/*function mutationsObserver(mutations){
	mutations.forEach(this)
}*/
/**
  @params this a bound mutationAddObserver 
*/
/*function mutationObserver(mutation){
	forEach.call(mutation.addedNodes,this)
}*/
/**
  @param this a bound mutatinoAddObserveTag
  @param node a single mutation.addedNode
*/
/*function mutationAddObserver(node){
	forEach.call(node.getElementsByTagName(this.tag),this)
}*/
/**
  @param tag a Tag object
  @returns a ready to go MutationObserver that will queue new nodes
*/
/*function makeMutationObserver(tag){
	var queue= tag.queue,
	  put= queue.put.bind(queue),
       mutationAddObserver= mutationAddObserver.bind(put),
       mutationObserver= mutationObserver.bind(mutationAddObserver),
	  mutationsObserver= mutationsObserver.bind(mutationObserver)
	return new MutationObserver(mutationsObserver)
}*/

/*
// SWEET.JS MACRO EDITION
*/
macro forThing {
	case ($a:expr, $b:expr) => {(function(val){$1=arguments[0]; forEach.call($b, this)}).bind($a)}
	case ($a:expr) =>          {(function(val){forEach.call(val,this)}).bind($a)}
}
function makeMutationObserver(tag){
	var queue= tag.queue, 
	  put= queue.put.bind(queue),
	  mutationAddObserve= forThing(put, $1.getElementsByTagName(this.tag)),
	  mutationObserver= forThing(mutationAddObserve, $1.addedNodes),
	  mutationsObserver= forThing(mutationObserver)
	return new MutationObserver(mutationsObserver)
}
/*
*/
