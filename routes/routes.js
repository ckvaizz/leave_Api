const { ObjectId } = require("fastify-mongodb");
const { leaveRequest, leaveUpdate } = require("../schema");

async function routes(fastify, options) {
  let User = fastify.mongo.db.collection("user");
  let Leave = fastify.mongo.db.collection("leave");
  fastify.post("/leave-request", { schema: leaveRequest }, async (req, res) => {
    try {
      const { userId, reason, leaveDate } = req.body;

      await Leave.insertOne({ userId, reason, leaveDate, status: false });
      res.send({ status: true, message: "request sended" });
    } catch (error) {
      console.log(error);
      res.send({ status: false, message: error });
    }
  });
  fastify.get("/get-leaves", async (req, res) => {
    try {
      const leaves = await Leave.find({}).toArray();
      res.send(leaves);
    } catch (error) {
      res.send({ status: false, message: error });
    }
  });

  fastify.put("/update-leave", { schema: leaveUpdate }, async (req, res) => {
    try {
      const { status, id } = req.body;
      if (status != "approve" && status != "reject")
        return res.send({ status: false, message: "something went wrong" });
      console.log(req.body);
      Leave.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: { status: status == "approve" ? true : false },
        }
      )
        .then(async (updated) => {
          if (status == "approve") {
            await User.updateOne(
              { userId: parseInt(updated.value.userId) },
              {
                $push: { allLeaves: updated.value.leaveDate },
              }
            );
          }
          res.send({ status: true, message: "success !!" });
        })
        .catch((e) =>
          res.send({ status: false, message: "something went wrong" })
        );
    } catch (error) {
      console.log(error);
      res.send({ status: false, message: error });
    }
  });
}

module.exports = routes;
