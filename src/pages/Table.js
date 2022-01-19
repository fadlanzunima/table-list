import React, { useEffect, useState } from "react";

import { Table, Select, Row, Col, Input, Button } from "antd";

const { Column, ColumnGroup } = Table;
const { Option } = Select;

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

function Tables() {
  const [user, setUser] = useState([]);
  const [gender, setGender] = useState(null);
  const [searchemail, setSearchEmail] = useState("");

  const fetchList = () => {
    const urlFetch = fetch(
      "https://randomuser.me/api/?results=100&exc=login&seed=foobar"
    );
    urlFetch
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setUser(data.results);
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  function handleChange(value) {
    setGender(value);
    if (gender !== "") {
      const urlFetch = fetch(
        `https://randomuser.me/api/?results=100&gender=${value}`
      );
      urlFetch
        .then((res) => {
          if (res.status === 200) return res.json();
        })
        .then((data) => {
          setUser(data.results);
        });
    }
  }

  const onSearch = (event) => {
    setSearchEmail(event.target.value);
  };

  function fetchSearch() {
    if (searchemail !== null) {
      const urlFetch = fetch(
        `https://randomuser.me/api/?results=100&gender=${searchemail}`
      );
      urlFetch
        .then((res) => {
          if (res.status === 200) return res.json();
        })
        .then((data) => {
          setUser(data.results);
        });
    }
  }

  const resetFunction = () => {
    setSearchEmail("");
    setGender(null);
    fetchList();
  };
  return (
    <div>
      <Row gutter={20}>
        <Col className="gutter-row" span={8}>
          <Input
            placeholder="search gander"
            value={searchemail}
            onChange={onSearch}
            style={{ width: "100%" }}
          />
        </Col>
        <Button type="primary" onClick={fetchSearch}>
          Search
        </Button>

        <Col className="gutter-row" span={8}>
          <Select
            placeholder="Select gender"
            style={{ width: "100%" }}
            value={gender}
            onChange={handleChange}
          >
            <Option value="0" disabled>
              Choose gender
            </Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Col>
        <Button type="primary" onClick={resetFunction}>
          Reset
        </Button>
      </Row>
      <Table dataSource={user} pagination>
        <ColumnGroup title="Name">
          <Column
            title="Title"
            dataIndex="name"
            key="title"
            render={(name) => <>{name.title}</>}
          />
          <Column
            title="First Name"
            dataIndex="name"
            key="first"
            filterSearch={true}
            filters={[{ text: "" }]}
            onFilter={(value, name) => name.first.startsWith(value)}
            render={(name) => <>{name.first}</>}
          />
          <Column
            title="Last Name"
            dataIndex="name"
            key="last"
            render={(name) => <>{name.last}</>}
          />
        </ColumnGroup>
        <Column
          title="Age"
          dataIndex="registered"
          key="registered"
          render={(registered) => <>{registered.age}</>}
          sorter={(a, b) => a.registered.age - b.registered.age}
        />
        <Column
          title="Address"
          dataIndex="location"
          key="address"
          render={(address) => (
            <>
              {address.street.name} <br></br>
              {address.street.number}
              <br></br> State : {address.state}
            </>
          )}
        />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
          render={(email) => <>{email}</>}
        />
        <Column
          title="Gender"
          dataIndex="gender"
          key="gender"
          render={(gender) => <>{gender}</>}
        />
        {/*<Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        /> */}
        {/* <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        /> */}
      </Table>
      {/* <Pagination
        total={user.length}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={20}
        defaultCurrent={1}
      /> */}
    </div>
  );
}

export default Tables;
