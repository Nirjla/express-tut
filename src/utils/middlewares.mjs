export const resolvedByUserId = (request, response, next) => {
      const {
        params: { id },
      } = request;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return response.status(400).send({ msg: "Bad Request Error" });
      }
      const userIndex = users.findIndex((user) => user.id === parsedId);
      if (userIndex === -1) {
        return response.status(404).send({ msg: "User Not Found" });
      }
      request.userIndex = userIndex;
      next();
    };
    