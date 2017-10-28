using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

public class UserRepository
{
    private string connectionString;
    public UserRepository()
    {
        connectionString = @"Server=EDLAPTOP\EDLAPTOPSQL;Database=HouseMoney_Dev_V3;User Id=HMApp;Password=dickbutt11!";
    }

    public IDbConnection Connection
    {
        get  {
            return new SqlConnection(connectionString);
        }
    }

    public void Add(User prod)
    {
        using (IDbConnection dbConnection = Connection)
        {
            string sQuery = "EXEC USERS_INSERT"
                                + "  @USERID = @UserId"
                                + ", @DISPLAYNAME = @DisplayName"
                                + ", @HOUSEHOLDID = @HouseHoldId";
            dbConnection.Open();
            dbConnection.Execute(sQuery, prod);
        }
    }

    public IEnumerable<User> GetAll()
    {
        using (IDbConnection dbConnection = Connection)
        {
            dbConnection.Open();
            return dbConnection.Query<User>("SELECT * FROM Users");
        }
    }

    public User GetById(int id)
    {
        using (IDbConnection dbConnection = Connection)
        {
            string sQuery = "SELECT * FROM Users" 
                           + " WHERE USERID = @UserId";
            dbConnection.Open();
            return dbConnection.Query<User>(sQuery, new { Id = id }).FirstOrDefault();
        }
    }

    public void Delete(int id)
    {
        using (IDbConnection dbConnection = Connection)
        {
             string sQuery = "DELETE FROM Users" 
                          + " WHERE USERID = @UserId";
            dbConnection.Open();
            dbConnection.Execute(sQuery, new { Id = id });
        }
    }

    public void Update(User prod)
    {
        using (IDbConnection dbConnection = Connection)
        {
            string sQuery = "UPDATE USERS SET DISPLAYNAME = @DISPLAYNAME,"
                           + " WHERE USERID = @UserId";
            dbConnection.Open();
            dbConnection.Query(sQuery, prod);
        }
    }
}