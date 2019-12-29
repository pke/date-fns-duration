/** eslint-globals: describe, it */
const { assert } = require("chai") 
const { toDate, parseISO } = require("date-fns")

const addDuration = require("./index")

describe("duration", function() {

  describe("invalid usage", function() {
    it("should throw on invalid date", function() {
      assert.throws(() => addDuration(NaN, "PT2H"), /invalid date: "Invalid Date"/)
    })
  
    it("should throw on invalid duration", function() {
      assert.throws(() => addDuration(Date.now(), ""), /invalid duration: "". Must be an ISO 8601 duration/)
      assert.throws(() => addDuration("2018-10-02T10:00", "P"), /invalid duration: "P". Must be an ISO 8601 duration/)
    })
  })
  
  describe("valid usages", function() {
    it("should add duration", function() {
      assert.equal(addDuration("2018-10-02T10:00", "PT2H").getTime(), toDate(parseISO("2018-10-02T12:00")).getTime())
      assert.equal(addDuration("2018-10-02T10:00", "P2Y").getTime(), toDate(parseISO("2020-10-02T10:00")).getTime())
      assert.equal(addDuration("2018-10-02T10:00", "P1M").getTime(), toDate(parseISO("2018-11-02T10:00")).getTime())
    })
  
    it("should subtract duration", function() {
      assert.equal(addDuration("2018-10-02T10:00", "-PT2H").getTime(), toDate(parseISO("2018-10-02T08:00")).getTime())
    })
    
    it("should not fail when adding nothing", function() {
      assert.equal(addDuration("2018-10-02T10:00", "P0D").getTime(), toDate(parseISO("2018-10-02T10:00")).getTime())
    })
  })
})

