using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace Service.DataService
{
    public class DataAccess
    {
        private readonly string _sqlConnection;

        public DataAccess(string sqlConnection)
        {
            _sqlConnection = sqlConnection;
        }

        public void ExecuteProcedureWithoutReturnValue(string procedureName, DynamicParameters paramSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                con.Execute(procedureName, paramSet, commandType: CommandType.StoredProcedure);
            }
        }

        public string ExecuteProcedure(string procedureName, DynamicParameters paramSet = null)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    con.Execute(procedureName, paramSet, commandType: CommandType.StoredProcedure);
                    return "OK";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public int ExecuteProcedureInt(string procedureName, DynamicParameters paramSet = null)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    return con.Execute(procedureName, paramSet, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public string ExecuteProcedureModel<T>(string procedureName, T obj)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    con.Execute(procedureName, obj, commandType: CommandType.StoredProcedure);
                    return "OK";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        public T ExecuteReturnScalar<T>(string procedureName, DynamicParameters paramSet = null) where T : class
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return (con.ExecuteScalar(procedureName, paramSet, commandType: CommandType.StoredProcedure)) as T;
            }
        }
        public bool Execute<T>(string statement, T obj)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    con.Execute(statement, obj);
                    return true;
                }
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public bool ExecuteQuery(string statement)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    con.Execute(statement);
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public string ExecuteQueryReturnString(string statement)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    return con.QueryFirstOrDefault<string>(statement);
                }
            }
            catch (Exception ex)
            {
                return "Error";
            }
        }

        public IEnumerable<T> GetList<T>(string stringQuery, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query<T>(stringQuery, parameterSet);
            }
        }

        public IEnumerable<T> GetListSp<T>(string procedureName, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query<T>(procedureName, parameterSet, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<T> GetQueryListSp<T>(string query)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query<T>(query);
            }
        }

        public T GetObjectSp<T>(string procedureName, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query<T>(procedureName, parameterSet, commandType: CommandType.StoredProcedure).SingleOrDefault();
            }
        }

        public object GetListSp(string procedureName, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query(procedureName, parameterSet, commandType: CommandType.StoredProcedure);
                //return con.Query(procedureName, parameterSet, commandType: CommandType.StoredProcedure).FirstOrDefault();

            }
        }

        public object GetList(string procedureName, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                con.Open();
                return con.Query(procedureName, parameterSet);
                //return con.Query(procedureName, parameterSet, commandType: CommandType.StoredProcedure).FirstOrDefault();

            }
        }

        public int GetSpInt(string procedureName, DynamicParameters parameterSet = null)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.QueryFirstOrDefault<int>(procedureName, parameterSet, commandType: CommandType.StoredProcedure);
            }
        }

        public string GetQueryString(string statement)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                return con.Query<string>(statement).FirstOrDefault();
            }
        }

        public int GetQueryInt(string statement)
        {
            try
            {
                using (var con = new SqlConnection(_sqlConnection))
                {
                    return con.Query<int>(statement).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }


        public void ExecuteProcedureWithoutReturnValueWithTransactions(string[] procedureNames, DynamicParameters[] paramSet)
        {
            if (procedureNames.Length != paramSet.Length)
            {
                throw new Exception("Parameter sets and procedures should have the same number of elements");
            }

            using (var con = new SqlConnection(_sqlConnection))
            {
                con.Open();

                using (var t = con.BeginTransaction())
                {
                    try
                    {
                        for (var i = 0; i < procedureNames.Length; i++)
                        {
                            con.Execute(procedureNames[i], paramSet[i], commandType: CommandType.StoredProcedure);
                        }
                        t.Commit();
                    }
                    catch (Exception)
                    {
                        t.Rollback();
                        throw;
                    }
                }
            }
        }

        public T Query<T>(string statement, T obj)
        {
            using (var con = new SqlConnection(_sqlConnection))
            {
                con.Open();
                return con.Query<T>(statement, obj).FirstOrDefault();
            }
        }
    }
}
