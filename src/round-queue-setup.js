const chai   = require('chai'),
      expect = chai.expect,
      should = chai.should();

const RoundQueue = require('./round-linked-queue-initial-impl.js');

describe('Round-Queue', () => {
    describe('When adding elements', () => {
        it('Should add an element to the end of a non-full queue', () => {
            // Queue with max size of 3
            let nonFullQueue = new RoundQueue(3);
            const originalSize = nonFullQueue.size;

            const poppedElement = nonFullQueue.push(1);

            // When the queue is not full, no popping will be done
            expect(poppedElement).to.be.undefined;

            // Element should've been added in the end of the queue
            nonFullQueue.last().should.be.equal(1)
            // Size should be increased by 1
            nonFullQueue.size.should.be.equals(originalSize + 1)
        })

        it('Should pop the first element and add the new element to the end of the queue', () => {
            let fullQueue = new RoundQueue(3),
                originalSize,
                poppedElement;

            fullQueue.push(1);
            fullQueue.push(2);
            fullQueue.push(3); // Queue is now full

            originalSize = fullQueue.size;

            poppedElement = fullQueue.push(4);

            // The first element should've been popped
            poppedElement.should.be.equal(1);
            // The second element should've been shifted to the first position
            fullQueue.first().should.be.equal(2);
            // The new element should've been added to the end of the queue
            fullQueue.last().should.be.equal(4)
            // The size should've been changed
            fullQueue.size.should.be.equal(originalSize)
        })
    })

    describe('When removing elements', function(){
        
        it('Should remove the first element of a non-empty queue', function(){
            var nonEmptyQueue = new RoundQueue(3),
                originalSize,
                poppedElement;

            nonEmptyQueue.push(1);
            nonEmptyQueue.push(2);

            originalSize = nonEmptyQueue.size;

            poppedElement = nonEmptyQueue.pop();

            // The first elements should've been popped
            poppedElement.should.be.equal(1);

            // The second element should've been shifted to the first position
            nonEmptyQueue.first().should.be.equal(2);

            // The size should've been decreased by 1
            nonEmptyQueue.size.should.be.equal(originalSize - 1);
        });

        it('Should throw an error on an empty queue', function(){
            var emptyQueue = new RoundQueue(3);

            expect(emptyQueue.pop).to.throw(Error);
        });

    });
});