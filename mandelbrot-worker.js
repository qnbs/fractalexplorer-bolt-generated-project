self.addEventListener('message', (event) => {
      const { width, height, zoom, x, y, iterations } = event.data;
      const data = new Float32Array(width * height);
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const re = (i - width / 2) / (zoom * width / 2) + x;
          const im = (j - height / 2) / (zoom * height / 2) + y;
          let z_re = 0;
          let z_im = 0;
          let count = 0;
          while (z_re * z_re + z_im * z_im <= 4 && count < iterations) {
            const temp = z_re * z_re - z_im * z_im + re;
            z_im = 2 * z_re * z_im + im;
            z_re = temp;
            count++;
          }
          data[i * height + j] = count / iterations;
        }
      }
      self.postMessage(data);
    });
