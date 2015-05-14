if (typeof Promise.prototype.done !== 'function') {
  Promise.prototype.done = function (onFulfilled, onRejected) {
    let self = arguments.length ? this.then.apply(this, arguments) : this;
    self.then(null, function (err) {
      setTimeout(function () {
        throw err;
      }, 0);
    });
  };
}

export default function async(gen) {
    return function() {
        let iter = gen.apply(this, arguments);
        
        function step(res) {
            let val = Promise.resolve(res.value);
            if(res.done) {
                return val;
            }
            return val.then(val => step(iter.next(val)), err => step(iter.throw(err)));
        }
        
        try {
            return step(iter.next());
        } catch(e) {
            return Promise.reject(e);
        }
    };
};

async.proc = function(gen) {
    let f = async(gen);
    return function() {
        f.apply(this, arguments).done();
    };
};

async.go = function(gen, self) {
    async.proc(gen).apply(self);
};

async.timeout = function(time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};

