pragma solidity >=0.4.22 <0.9.0;

contract Contract {
    uint public id;

    struct Certificate {
        uint id;
        string f_name;
        string l_name;
        string mother;
        string father;
        string birth_date;
    }

    mapping(uint => Certificate) public map;

    function createCertificate(string memory f_name, string memory l_name, string memory mother, string memory father, string memory birth_date) public {
        id++;
        map[id] = Certificate(id, f_name, l_name, mother, father, birth_date);
    }
}
