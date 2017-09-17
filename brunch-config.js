// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  }
};

exports.paths = {
  public: 'dist'
}

exports.plugins = {
  babel: {presets: ['es2015']}
};
