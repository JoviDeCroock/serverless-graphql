import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-2',
});

const dynamodb = new AWS.DynamoDB();

const usersTable = {
  TableName: 'users',
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'N' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

dynamodb.updateTable(usersTable, function (err, data) {
  if (err) {
    console.error(
      'Unable to update table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Updated table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
});
