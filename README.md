# H-Tree Construction

![Picture of H-Tree](h-tree.png)

https://en.wikipedia.org/wiki/H_tree

Originally implemented for a [Pramp interview](https://www.pramp.com/invt/lY9Lxp2vVZidqxz6qAGo). The Pramp interview platform did not include a proper `drawLine()` function, so I implemented this along with tests to verify the correctness of my solution.

View it here: https://bradhanson.github.io/h-tree-construction/

My original solution as coded in the allocated 30~ minute interview turned out to be mostly correct, but had a couple <strike>errors</strike> opportunities for improvement:

Opportunities for improvement:

- I misunderstood the scaling coefficient. I took root of line length instead of diving line length by √2.
- I did not account for depth = 0.

I noticed the scaling coefficient mistake after I implemented the drawing function and visually it did not look correct. However, even after fixing the mistake it still did not look correct. This lead me to discovering an error in the Pramp H-Tree-Construction specification:

> It can be constructed by starting with a line segment of arbitrary length, **drawing two segments of the same length** at right angles to the first through its endpoints, and continuing in the same vein, reducing (dividing) the length of the line segments drawn at each stage by √2.

Here is the correct specification from Wikipedia:

> An H tree can be constructed by starting with a line segment of arbitrary length, **drawing two shorter segments** at right angles to the first through its endpoints, and continuing in the same vein, reducing (dividing) the length of the line segments drawn at each stage by √2.

I acknowledge that they could have simplified the problem for interview purposes.

TODO:

- Write tests (figure out how to mock `drawLine()`)
- Refactor/cleanup code
